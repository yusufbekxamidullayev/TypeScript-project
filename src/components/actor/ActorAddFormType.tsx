import type { Dayjs } from "dayjs";

export interface ActorAddFormType {
    full_name: string,
    photo_url: string,
    birth_year: Dayjs,
    biography: string,
    country: string,
}