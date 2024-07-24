declare module 'react-native-chart-kit' {
    import {Component} from 'react'
    import {ViewStyle, TextStyle} from 'react-native'

    export interface ChartConfig
    {
        backgroundColor: string
        backgroundGradientFrom: string
        backgroundGradientTo: string
        decimalPlaces?: number
        color: (opacity: number) => string
        labelColor: (opacity: number) => string
        style?: ViewStyle
        propsForDots?: {
            r: string
            strokeWidth: string
            stroke: string
        }
    }

    export interface PieChartProps
    {
        data: Array<{
            name: string
            population: number
            color: string
            legendFontColor: string
            legendFontSize: number
            labels: string[]
        }>
        width: number
        height: number
        chartConfig: ChartConfig
        accessor: string
        backgroundColor?: string
        paddingLeft?: string
        absolute?: boolean
        style?: ViewStyle
        hideLegend?: boolean
        hasLegend: boolean
    }

    export class PieChart extends Component<PieChartProps> { }
}