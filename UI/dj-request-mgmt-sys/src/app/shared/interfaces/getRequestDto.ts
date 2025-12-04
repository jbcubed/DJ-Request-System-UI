export interface getEventRequestDto {
    id: string;
    name: string;
    description?: string;
    votes: number;
    eventId: string;
    requestResponseNotes?: string;
}