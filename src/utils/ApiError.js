class ApiError extends Error{
    constructor(
        ststusCode,
        message="Something went wrong",
        error=[],
        stack=""  //error stack
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.error=errors


        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}