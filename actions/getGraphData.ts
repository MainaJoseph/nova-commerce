import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    //Get the start and end days for the data range
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    //Query the database to get orderdata grouped by createdAT
    const result = await prisma.order.groupBy({
      by: ["createdDate"], // Change "createdAt" to "createdDate"
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    //intialize object to aggragate the data

    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    //create a clone at the start to iterate over each day
    const currentDate = startDate.clone();

    //iterate over each date in the date range
    while (currentDate <= endDate) {
      //format the day as a string (eg..Monday)
      const day = currentDate.format("dddd");
      console.log("<<<<day", day);

      //initialize the aggregated datafor the day with the day, date and total amount
      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      //move to the next day
      currentDate.add(1, "day");

      //calculate the total amount for each day by assuming the orders amount
      result.forEach((entry) => {
        const day = moment(entry.createdDate).format("dddd");
        const amount = entry._sum?.amount || 0;
        aggregatedData[day].totalAmount += amount;
      });
    }

    //convert the aggregatedData object to the array and sort it by date
    return Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );
  } catch (error: any) {
    throw new Error(error);
  }
}
