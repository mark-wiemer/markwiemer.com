/** Render a single emoji in a consistent font on any device */
const Emoji: React.FC<{ emoji: string }> = ({ emoji }) => {
    return (
        <span
            style={{
                fontFamily: 'Noto Color Emoji, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
            }}
        >
            {emoji}
        </span>
    );
};

export default Emoji;
