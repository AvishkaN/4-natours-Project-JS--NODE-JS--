class APIFeatures{
    constructor(query,queryString){ // Tour.find() , req.qurey
        this.query=query;
        this.queryString=queryString;
    }

    filter(){  // http://localhost:8000/api/v1/tours?price[gte]=1000
        // 1A FILTERING 
            // BUILD the query
        const quaryObject={...this.queryString};
        const excludeItems=['page','sort','limit','fields']
        excludeItems.forEach(item=>delete  quaryObject[item])
                
        //1B ADVANCE FILTERING
        let quarySTR=JSON.stringify(quaryObject);
        quarySTR=quarySTR.replace(/\b(lt|gt|lte|gte)\b/g,match=>`$${match}`)
        
        this.query.find(JSON.parse(quarySTR));
        console.log(this)
        return this;
    }

    sort(){   // http://localhost:8000/api/v1/tours?sort=maxGroupSize
        // 2 SORTING  
        if(this.queryString.sort){
            const sort=this.queryString.sort.split(',').join(' ');
            this.query=this.query.sort(sort)
        }else{
            this.query=this.query.sort('-createAt')
        }
        return this;
    }
    fieldLimiting(){ // http://localhost:8000/api/v1/tours?fields=name,maxGroupSize
        // 3) FILED LIMITING
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ');
            this.query=this.query.select(fields)
        }else{
            this.query=this.query.select('-__v')

        }

        return this;
    }

    pagination(){ // http://localhost:8000/api/v1/tours?page=1&limit=3
        // 4) PAGINATION
        const page=this.queryString.page*1 | 1; 
        const limit=this.queryString.limit*1 || 100; 
        const skip=(page-1) * limit; 
        this.query=this.query.skip(skip).limit(limit);

        return this;
    }

};

module.exports=APIFeatures;
