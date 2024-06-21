import { useEffect, useState } from "react";

export type StateType<T = any> = {
  state: T;
};

export type DisclosureType<IState = any> = {
  isOpen: boolean;
  open: (state?: StateType<IState>) => void;
  close: (state?: StateType<IState>) => void;
  toggle: (state?: StateType<IState>) => void;
  state?: IState;
};

type DisclosureProps = {
  opened: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export const useDisclosure = ({
  opened: initialState,
  onOpen,
  onClose,
}: DisclosureProps): DisclosureType => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [state, setState] = useState<StateType>({ state: null });

  useEffect(() => {
    if (isOpen !== initialState) {
      setIsOpen(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  const open = (state?: StateType) => {
    setIsOpen(true);
    if (state) setState(state);
    if (onOpen) {
      onOpen();
    }
  };

  const close = (state?: StateType) => {
    setIsOpen(false);

    if (state) setState(state);
    else setState({ state: null });

    if (onClose) {
      onClose();
    }
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle, ...state };
};
