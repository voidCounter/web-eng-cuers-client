type UniversityType = {
    university_id: number;        // Primary key, auto-incremented
    university_name: string;      // University name (not null, unique)
    university_abbr: string;      // University abbreviation (not null)
};