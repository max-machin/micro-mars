import { UserFormatterDto } from "./get-user-formatter.dto";

export class GetUserEvent {
  constructor(
    public readonly getUserFormatterDto: UserFormatterDto
  ) {}

  toString() {
    return JSON.stringify({
      data: this.getUserFormatterDto 
    });
  }
}