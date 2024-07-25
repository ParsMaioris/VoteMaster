import React from 'react'
import {Dimensions, View, StyleSheet} from 'react-native'
import Svg, {Rect, G, Text} from 'react-native-svg'

const {width: screenWidth} = Dimensions.get('window')

const EducationBarChart = () =>
{
    const data = [
        {label: ['Teacher', 'Salaries'], value: 300, color: '#6b8e23'}, // Olive Drab
        {label: ['School', 'Supplies'], value: 700, color: '#4682b4'}, // Steel Blue
        {label: ['School', 'Infrastructure'], value: 500, color: '#ff6347'}, // Tomato
        {label: ['Extracurricular', 'Activities'], value: 500, color: '#daa520'}, // Goldenrod
    ]

    const SVGHeight = 200
    const SVGWidth = screenWidth * 0.9
    const barWidth = 40
    const barGap = (SVGWidth - data.length * barWidth) / (data.length + 1)
    const maxValue = Math.max(...data.map(item => item.value))
    const padding = 29

    return (
        <View style={styles.container}>
            <Svg height={SVGHeight} width={SVGWidth}>
                <G>
                    {data.map((item, index) =>
                    {
                        const barHeight = (item.value / maxValue) * (SVGHeight - 2 * padding)
                        const x = barGap + index * (barWidth + barGap)
                        const y = SVGHeight - barHeight - padding

                        return (
                            <G key={index}>
                                <Rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={item.color}
                                    rx={4} // Subtle rounded corners
                                    ry={4} // Subtle rounded corners
                                />
                                <Text
                                    x={x + barWidth / 2}
                                    y={y - 10}
                                    fontSize="10"
                                    fill="#000"
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                >
                                    {`$${item.value} mil`}
                                </Text>
                                <Text
                                    x={x + barWidth / 2}
                                    y={SVGHeight - padding + 7}
                                    fontSize="10"
                                    fill="#000"
                                    textAnchor="middle"
                                    alignmentBaseline="hanging"
                                >
                                    {item.label[0]}
                                </Text>
                                <Text
                                    x={x + barWidth / 2}
                                    y={SVGHeight - padding + 20}
                                    fontSize="10"
                                    fill="#000"
                                    textAnchor="middle"
                                    alignmentBaseline="hanging"
                                >
                                    {item.label[1]}
                                </Text>
                            </G>
                        )
                    })}
                </G>
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        alignItems: 'center'
    },
})

export default EducationBarChart