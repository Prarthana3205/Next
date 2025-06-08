"use client"
import {usePathname} from "next/navigation"
export default function NotFound()
{
    const pathname=usePathname();
    const reviewno=pathname.split("/")[4]
    const ProductID=pathname.split("/")[2]
    return <h1>Review {reviewno} for Product {ProductID} NOT FOUND</h1>
}