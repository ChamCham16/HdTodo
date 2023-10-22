import { Text as RNText, TextStyle } from 'react-native';

export interface TextProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    style?: TextStyle;
    bold?: boolean,
    color?: string,
    children: React.ReactNode;
}

const getSize: { [key: string]: number } = {
    'xs': 12,
    'sm': 14,
    'md': 16,
    'lg': 18,
    'xl': 20,
    '2xl': 24,
    '3xl': 30,
}

const checkSize = (size: string): number => {
    return getSize[size] || 0;
}

const Text = ({
    size = 'md',
    children,
    style,
    bold,
    color = '#000',
}: TextProps) => {
    return (
        <RNText
            style={{
                ...style,
                fontFamily: 'Poppins-Regular',
                fontSize: checkSize(size),
                fontWeight: bold ? '700' : '400',
                color: color,
            }}
        >
            {children}
        </RNText>
    );
};

export default Text;