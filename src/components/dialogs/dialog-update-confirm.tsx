import { UpgradeConfirm } from "@/pages/app/upgrade/upgrade-confirm";
import { DisclosureType } from "@/utils/hooks/useDisclosure";

import { Dialog, DialogContent } from "../ui/dialog";

export function DialogUpdateConfirm({ isOpen, close, open }: DisclosureType) {
  return (
    <Dialog open={isOpen} onOpenChange={(e) => (e ? open() : close())}>
      <DialogContent
        close={false}
        className="p-3 md:w-[560px] md:max-w-[560px]"
      >
        <UpgradeConfirm close={close} />
      </DialogContent>
    </Dialog>
  );
}
