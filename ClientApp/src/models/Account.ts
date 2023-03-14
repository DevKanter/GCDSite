
export abstract class BaseResponse
{
    public success:boolean;
    public error:string;
}

export class UserLoginRequest {
  public Username: string;
  public Password: string;
}
export class UserLoginResponse extends BaseResponse
{
  public sessionID: string;
}
export class UserRegisterRequest {
  public Username: string;
  public Password: string;
  public Email: string;
}
export class UserRegisterResponse extends BaseResponse {
}
export abstract class BaseRequest {
  public IsAuthRequest = false;

}
export abstract class AuthRequest extends BaseRequest {
  public SessionID: string;
  constructor(sessionID: string) {
    super();
    this.SessionID = sessionID;
    this.IsAuthRequest = true;
  }

 
  
}
export class AccountInfoRequest extends AuthRequest {
  constructor(sessionID: string) { super(sessionID); }
}

export class AccountInfoResponse extends BaseResponse{
  public accountType?: number;
  public nickname?: string;
}
export class UserLogoutRequest extends AuthRequest {
  constructor(sessionID: string) { super(sessionID); }
}
export class UserLogoutResponse extends BaseResponse {
}


export class CharacterListRequest extends AuthRequest
{

}

export class CharacterListResponse extends BaseResponse
{
    public  characterList:CharacterListEntry[]
}
export class CharacterListEntry
{
    public classCode:ClassCode;
    public name:string;
    public level:number;
}


export enum WebsiteDBResult {
  FAIL = -1,
  SUCCESS,

  REGISTER_ACCOUNT_ID_ALREADY_IN_USE, //FIX used in S_RegisterAccount
  REGISTER_ACCOUNT_DATABASE_ERROR, //FIX used in S_RegisterAccount

  REGISTER_ACCOUNT_ERROR_CREATING_GAME_ACCOUNT,
  LOGIN_ACCOUNT_ID_NOT_FOUND,

  ADD_PERMISSION_ALREADY_EXISTS,
  ERROR_RETRIEVING_ACCOUNT_INFO,
}
export enum AccountType {
  NONE,
  SUPER_ADMIN,
  WEBSITE_ADMIN,
  WEBSITE_MOD,
  MEMBER
}
export enum ClassCode{
  Berserker,
  DragonKnight,
  Shadow,
  Valkyrie,
  Elementalist,
  Mystic,
  Helroid,
  Witchblade
}
