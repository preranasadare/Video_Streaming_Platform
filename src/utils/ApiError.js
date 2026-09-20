class ApiError extends Error{
    constructor(
        ststusCode,
        message="Something went wrong",
        error=[],
        statck=""  //error stack
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.error=errors


        if(statck){
            this.stack=statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}