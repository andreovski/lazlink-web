type Props = {
  color1: string;
  color2: string;
};

export function BubbleTheme({ color1, color2 }: Props) {
  return (
    <div className="h-6 w-6">
      <div
        className="inset-0 h-6 w-6 rounded-full border-2 border-input"
        style={{
          background: `linear-gradient(45deg, ${color1} 50%, ${color2} 50%)`,
        }}
      />
    </div>
  );
}
