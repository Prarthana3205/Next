export default function Productreview({params,}:
    {params: {reviewno:string;ProductID:string}}
)
{
    const {reviewno, ProductID}=params;
    return <h1>Review {reviewno} for product {ProductID}</h1>
}