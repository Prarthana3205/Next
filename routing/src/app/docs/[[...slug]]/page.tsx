export default function features({params}:
    {params:{slug?:string[]}}
)
{
    const {slug}=params;
    if(slug?.length===1)
    {
        return <h1>
            Viewing Feature : {slug[0]}                                                        
        </h1>
    }
    else if(slug?.length==2)
    {
        return <h1>
            Viewing feature : {slug[0]} and concept {slug[1]}
        </h1>
    }
    return <h1>
        Docs Page
    </h1>                                                                    
}