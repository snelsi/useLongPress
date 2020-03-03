import * as React from "react";

/**
 * Если пользователь нажмёт на элемент в течении holdTime миллисекунд
 * и не будет уводить курсор дальше holdDistance от стартовой точки,
 * то вызовется метод 'onLongPress'. Иначе будет вызван метод 'onClick'.
 *
 * If the user clicks on an item during holdTime milliseconds
 * and does not move the cursor further than holdDistance from the start point,
 * the 'onLongPress' method is called. Otherwise, the 'onClick' method will be called.
 */
export const useLongPress = <T>(
  onClick: () => void,
  onLongPress: () => void,
  holdTime = 300,
  holdDistance = 3 ** 2
) => {
  const [timer, setTimer] = React.useState(null);
  const [startPoint, setStartPoint] = React.useState({
    x: 0,
    y: 0
  });

  function triggerOnLongPress() {
    setTimer(null);
    onLongPress();
  }

  function onPointerDown(e: React.PointerEvent<T>) {
    setStartPoint({ x: e.clientX, y: e.clientY }); // Remember start point
    const event = { ...e };
    const timeoutId = window.setTimeout(
      triggerOnLongPress.bind(null, event),
      holdTime
    );
    setTimer(timeoutId);
  }

  function onPointerUp() {
    if (timer) {
      window.clearTimeout(timer);
      setTimer(null);
      onClick();
    }
  }

  function onPointerMove(e: React.PointerEvent<T>) {
    // Abort onHold timer, if the cursor moves out of to far from starting point
    if (timer) {
      const fromStartPoint =
        (e.clientX - startPoint.x) ** 2 + (e.clientY - startPoint.y) ** 2;
      if (fromStartPoint > holdDistance) {
        setTimer(null);
        window.clearTimeout(timer);
      }
    }
  }

  return {
    onPointerDown,
    onPointerUp,
    onPointerMove
  };
};
