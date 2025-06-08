import {notFound} from "next/navigation"

export default function Productreview({params,}:
    {params: {reviewno:string;ProductID:string}}
)
{
    const {reviewno, ProductID}=params;
    if(parseInt(reviewno)>1000)
    {
        notFound();
    }
    return <h1>Review {reviewno} for product {ProductID}</h1>
}