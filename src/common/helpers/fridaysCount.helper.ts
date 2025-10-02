export async function calculateFridays(month: number, year: number): Promise<number> {
    const targetMonth = month - 1;
  
    let date = new Date(year, targetMonth, 1);
  
    const day = date.getDay();
    const firstFriday = day <= 5 ? 5 - day + 1 : 12 - day + 1;
  
    date.setDate(firstFriday);
  
    let count = 0;
    while (date.getMonth() === targetMonth) {
      count++;
      date.setDate(date.getDate() + 7);
    }
  
    return count;
  }
  