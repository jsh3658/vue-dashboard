export const navi = [
    {
        idx: 0,
        label: 'UI Components',
        img: 'components',
        path: '/main',
        child: [
            {
                label: 'Main',
                path: '/main'
            },
            {
                label: 'DatePicker',
                path: '/datePicker'
            },
            {
                label: 'Filter',
                path: '/filter'
            },
            {
                label: 'DataTable',
                path: '/dataTable'
            },
            {
                label: 'tab',
                path: '/tab'
            },
            {
                label: 'Excel',
                path: '/excel'
            },
            {
                label: 'Chart',
                path: '/chart/line',
                child: [
                    {
                        label: 'Line',
                        path: '/chart/line'
                    },
                    {
                        label: 'Bar',
                        path: '/chart/bar'
                    },
                ]
            },
            {
                label: 'Button',
                path: '/button'
            },
        ]
    }
];