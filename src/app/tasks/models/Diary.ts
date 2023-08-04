export interface Diary {
  _id: string,
  description: string,
  date: Date,
  text: string,
  status: 'Unmarked' | 'Marked'
}
