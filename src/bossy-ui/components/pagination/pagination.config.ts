export class BossyPaginationConfig {

  constructor(
    public name: string,
    public alignment: string,
    public size: string,
    public pages: Array<{
      value: string,
      href: string,
      isActive: boolean,
      isDisabled: boolean,
    }>,
  ) {}
  
}
