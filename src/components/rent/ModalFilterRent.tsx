"use client";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import React, { useState } from "react";
import RentFilter from "./RentFilter";

function ModalFilterRent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="sm:hidden px-10 mt-10">
      {" "}
      <Button
        onPress={onOpen}
        className="bg-[#7575FE] rounded-full   z-9 w-full mx-auto text-white"
      >
        فیلتر ها{" "}
      </Button>{" "}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        // placement={modalPlacement}
      >
        <ModalContent className="h-[600px] overflow-auto">
          {(onClose) => (
            <>
              <ModalBody>
                <RentFilter inMobile={true} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalFilterRent;
