export interface Activity {
    id: string
    title: string
    date: Date | null; //allowing null or Date type
    description: string
    category: string
    city: string
    venue: string
  }
  