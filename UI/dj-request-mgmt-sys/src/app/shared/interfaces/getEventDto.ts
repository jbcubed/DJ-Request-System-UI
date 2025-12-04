export interface getEventDto {
    id: string;
    name: string;
    description?: string;
    eventSystemUserId: string;
    eventPublicId: string;
    startDate: string;
    endDate: string;
}