import { UpgradeConfirm } from "@/pages/app/upgrade/upgrade-confirm";
import { Dialog, DialogContent } from "../ui/dialog";
import { DisclosureType } from "@/utils/hooks/useDisclosure";

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
