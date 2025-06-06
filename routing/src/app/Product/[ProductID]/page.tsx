export default async function Products({params}:
    {params:Promise<{ProductID:string}>})
{
    const ProductID=(await params).ProductID
    return <h1>Details about Product {ProductID} </h1>
}

/*

Receives ProductID from URL (the dynamic part of the URL ) , that is why we use params
waits for it as it is a Promise and then displays it

async keyword means that it it will wait for something like a promise

function some_name(props)
{   
    const params=props.params
}
    this above function is the same as writing 
function some_name({params})
{
}
so basically params property on the object i receive
here the type of params is a promise that is in key value pairs

 */