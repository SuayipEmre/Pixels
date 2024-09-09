
export const THEME = {
    colors:{
        white : '#fff',
        black : '#000',
        grayBg : '#e5e5e5',
        neutral : (opacity : number) => `rgba(10, 10, 10, ${opacity})`,
        red: (opacity: number) => `rgba(255, 0, 0, ${opacity})`

    },
    fontWeights:{
        medium : 500 as 500, 
        semibold : 600 as 600,
        bold : 700 as 700
    },
    radius:{
        xs:10,
        sm:12,
        md:14,
        lg:16,
        xl:18
    },
} 