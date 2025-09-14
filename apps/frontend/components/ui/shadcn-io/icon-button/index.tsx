'use client';
 
import * as React from 'react';
import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';
 
import { cn } from '@/lib/utils';
 
const sizes = {
  default: 'size-8 [&_svg]:size-5',
  sm: 'size-6 [&_svg]:size-4',
  md: 'size-10 [&_svg]:size-6',
  lg: 'size-12 [&_svg]:size-7',
};
 
type IconButtonProps = Omit<HTMLMotionProps<'button'>, 'color'> & {
  icon: React.ElementType;
  active?: boolean;
  className?: string;
  animate?: boolean;
  size?: keyof typeof sizes;
  color?: [number, number, number];
  transition?: Transition;
};
 
function IconButton({
  icon: Icon,
  className,
  active = false,
  animate = true,
  size = 'default',
  color = [59, 130, 246],
  transition = { type: 'spring', stiffness: 300, damping: 15 },
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      data-slot="icon-button"
      className={cn(
        `group/icon-button cursor-pointer relative inline-flex size-10 shrink-0 rounded-full hover:bg-[var(--icon-button-color)]/10 active:bg-[var(--icon-button-color)]/20 text-[var(--icon-button-color)]`,
        sizes[size],
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={
        {
          '--icon-button-color': `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        } as React.CSSProperties
      }
      {...props}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 stroke-muted-foreground group-hover/icon-button:stroke-[var(--icon-button-color)]"
        aria-hidden="true"
      >
        {React.createElement(Icon as React.ComponentType<any>, {
          className: active ? 'fill-[var(--icon-button-color)]' : 'fill-transparent'
        })}
      </motion.div>
    </motion.button>
  );
}
 
export { IconButton, sizes, type IconButtonProps };