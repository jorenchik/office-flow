import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useInfoModal, usePromptModal } from "./ModalContext";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useLocaleEntries } from "../Locale/LocaleContext";

export default function Modal({
  type = 'info',
  className,
  children,
  maxWidth = "2xl",
  closeable = true,
}) {
  const modal = type === 'info' ? useInfoModal() : usePromptModal();

  let {isOpen, content, handleClose, onConfirm, onCancel} = modal;

  if(type !== 'prompt')
  {
    onCancel = () => {};
  }

  const localeEntries = useLocaleEntries();

  const confirmAndClose = () => {
    onConfirm();
    handleClose();  // updated to use handleClose
  }

  const cancelAndClose = () => {
    onCancel();
    handleClose();  // updated to use handleClose
  }

  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];

  return (
    <Transition show={isOpen}
      as={Fragment}
      leave="duration-200">
      <Dialog as="div" id="modal" className={`flex overflow-y-auto fixed inset-0 z-50 items-center transition-all transform sm:px-0 ${className}`}
        onClose={cancelAndClose}>
        <Transition.Child as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="absolute inset-0 bg-gray-400/80" />
        </Transition.Child>

        <Transition.Child as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <Dialog.Panel className={`overflow-hidden bg-white w-1/3 rounded-3xl h-1/4 shadow-xl transition-all mx-auto`}>
            <div className={`h-full flex flex-wrap items-center justify-center text-2xl text-center`}>
              {content}
            </div>
            {type === 'prompt' && (
              <div className="absolute uppercase right-6 bottom-6 justify-end">
                <PrimaryButton onClick={confirmAndClose} className="mr-2">
                  {localeEntries['yes']}
                </PrimaryButton>
                <PrimaryButton onClick={cancelAndClose}>
                  {localeEntries['no']}
                </PrimaryButton>
              </div>
            )}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
