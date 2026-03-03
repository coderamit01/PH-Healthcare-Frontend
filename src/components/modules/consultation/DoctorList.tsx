"use client";
import { getDoctors } from "@/app/(commonLayout)/consultation/_action";
import { useQuery } from "@tanstack/react-query";

const DoctorList = () => {
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
  });
  console.log(data);
  return <div>DoctorList</div>;
};

export default DoctorList;
