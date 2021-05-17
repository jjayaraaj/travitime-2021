export class OperatorUser {
  constructor(
    public id: string,
    public username: string,
    public name: string,
    private _token:string,
    public email:string,
   private _tokenExpiration: Date,
    public isActive:number,
  ) {}

  get token() {
    if(!this._tokenExpiration || new Date() > this._tokenExpiration ){
      return null;
    }

    return this._token;
  }

}
