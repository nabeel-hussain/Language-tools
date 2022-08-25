export interface MenuItem {
  name: string;
  breadcrumb?: string;
  icon?: string;
  isHide?: boolean;
  subMenu?: MenuItem[];
  component: string;
  path: "";
}
