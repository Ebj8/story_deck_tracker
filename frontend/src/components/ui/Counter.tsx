import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";

type CounterProps = {
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const Counter: React.FC<CounterProps> = ({
  label,
  count,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Label className="text-sm justify-self-center">{label}</Label>
      <div className="flex items-center space-x-2">
        <Button onClick={onDecrement} className="px-2 py-1 text-xs max-h-6">
          -
        </Button>
        <div className="relative w-8 h-8 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-lg font-bold"
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>
        <Button onClick={onIncrement} className="px-2 py-1 text-xs max-h-6">
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;
