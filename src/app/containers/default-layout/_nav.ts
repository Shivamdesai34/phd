import {INavData} from '@coreui/angular-pro';

export const navItems: INavData[] = [
    {
        name: $localize`Dashboard`,
        url: '/dashboard',
        iconComponent: {name: 'cil-speedometer'},
    },
    // {
    //   name: 'Complete Profile',
    //   url: '/students/fillprofile',
    //   iconComponent:{name: 'cil-user'},
    // },
  {
    name: 'Fees Payment',
    url: '/fees',
    iconComponent:{name: 'cil-money'},
  },
  {
    name: 'Print Fee Receipt',
    url: '/feesreceipt',
    iconComponent:{name: 'cil-pen'},
  },
  {
    name: 'Cancel Admission',
    url: '/canceladmission',
    iconComponent:{name: 'cil-x-circle'},
  },
    // {
    //     name: 'View Marksheet',
    //     iconComponent:{name: 'cil-layers'},
    //     url: '/marksheet-viewer'
    // },

  //   {
  //       name: 'Query ticket',
  //       iconComponent:{name: 'cil-group'},
  //       url: '/queryticket',
  //   },
  // {
  //   name: 'Update Image/mobile/email',
  //   url: '/updateprofile',
  //   iconComponent:{name: 'cil-wallpaper'},
  // },
  {
    name: 'Admission 2024-2025',
    url: 'admission-2024-2025',
    iconComponent:{name: 'cil-user-plus'},
  },

  // {
  //   name: 'Additional Subject',
  //   url: '/additionalsubject',
  //   iconComponent:{name: 'cil-pen'},
  // },

];
