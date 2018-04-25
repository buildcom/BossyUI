export class BossyAlertConfig {
  constructor(public header: string,
              public text: string,
              public subText: string,
              public type: alertType,
              public size: alertSize) {
  }
}
export enum alertType {
    primary= 'primary',
    secondary= 'secondary',
    success= 'success',
    danger= 'danger',
    warning= 'warning',
    info= 'info',
    light= 'light',
    dark= 'dark'
}
export enum alertSize {
    large= 'large',
    medium= 'medium',
    small= 'small'
}
