"use client";

import type { ReactNode } from "react";
import { Eye } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type RequestDetailsData = {
  id: number;
  requester?: { full_name?: string | null } | null;
  request_type?: string | null;
  vehicle_nature?: string | null;
  number_of_persons?: number | null;
  created_at?: string | Date | null;
  approved_at?: string | Date | null;
  approval_status?: string | null;
  allocation_status?: string | null;
  travel_date_from?: string | Date | null;
  travel_date_to?: string | Date | null;
  required_time_from?: string | null;
  required_time_to?: string | null;
  purpose?: string | null;
  places_to_visit?: string | null;
  travel_route?: string | null;
  distance_type?: string | null;
  special_notes?: string | null;
  rejection_reason?: string | null;
  request_letter_path?: string | null;
};

interface RequestDetailsDialogProps {
  request: RequestDetailsData | null;
  open: boolean;
  onClose: () => void;
  statusLabel?: string | null;
  statusClass?: string | null;
}

function formatDate(dateValue?: string | Date | null) {
  if (!dateValue) return "—";
  const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function DetailField({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-gray-500">{label}</div>
      <div className="font-medium text-gray-900 whitespace-pre-wrap">{children || "—"}</div>
    </div>
  );
}

/** Shared request-information dialog used by the approved-request tables. */
export function RequestDetailsDialog({
  request,
  open,
  onClose,
  statusLabel,
  statusClass,
}: RequestDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2 text-gray-900">
            <Eye className="h-5 w-5 text-orange-600" />
            {request ? `REQ-${request.id}` : "Request Details"}
            {request && statusLabel ? (
              <Badge className={statusClass ?? "bg-gray-100 text-gray-800 border border-gray-200"}>
                {statusLabel}
              </Badge>
            ) : null}
          </DialogTitle>
          <DialogDescription>
            {request?.requester?.full_name ?? "Request information"}
          </DialogDescription>
        </DialogHeader>

        {request ? (
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <DetailField label="Request Type">{request.request_type}</DetailField>
            <DetailField label="Vehicle Nature">{request.vehicle_nature}</DetailField>
            <DetailField label="Number of Persons">{request.number_of_persons}</DetailField>
            <DetailField label="Trip Type">{request.distance_type}</DetailField>
            <DetailField label="Request Date">{formatDate(request.created_at)}</DetailField>
            <DetailField label="Travel Dates">
              {formatDate(request.travel_date_from)} to {formatDate(request.travel_date_to)}
            </DetailField>
            <DetailField label="Required Time">
              {request.required_time_from || "—"} to {request.required_time_to || "—"}
            </DetailField>
            {request.approved_at ? (
              <DetailField label="Approved Date">{formatDate(request.approved_at)}</DetailField>
            ) : null}
            <DetailField label="Purpose" className="sm:col-span-2">{request.purpose}</DetailField>
            <DetailField label="Places to Visit">{request.places_to_visit}</DetailField>
            <DetailField label="Travel Route">{request.travel_route}</DetailField>
            <DetailField label="Special Notes" className="sm:col-span-2">{request.special_notes}</DetailField>
            <DetailField label="Approval Status">{request.approval_status}</DetailField>
            <DetailField label="Allocation Status">{request.allocation_status}</DetailField>
            {request.rejection_reason ? (
              <DetailField label="Rejection Reason" className="sm:col-span-2">
                {request.rejection_reason}
              </DetailField>
            ) : null}
            <div className="sm:col-span-2">
              <div className="text-gray-500">Uploaded Letter</div>
              {request.request_letter_path ? (
                <a
                  href={`/api/vehicle-requests/${request.id}/letter/view`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  Open PDF in browser
                </a>
              ) : (
                <div className="font-medium text-gray-900">No attachment</div>
              )}
            </div>
          </div>
        ) : null}

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
