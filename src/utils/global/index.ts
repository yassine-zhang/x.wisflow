import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

/**
 * 将指定字符串复制到剪贴板，并在复制成功后显示成功消息。
 * 如果复制失败，则显示错误消息。
 *
 * @param value - 要复制的字符串值。
 * @param copiedMsg - 复制成功后要显示的消息。
 * @returns 当复制操作完成时，返回一个 Promise。
 */
export function copyTargetString(value: string, copiedMsg: string) {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast({
        title: "复制成功",
        description: copiedMsg,
      });
    })
    .catch((error) => {
      console.error("复制失败:", error);
      toast({
        description: "复制失败，请稍后重试",
        variant: "destructive",
      });
    });
}

/**
 * 检查当前设备是否为移动设备
 *
 * 该函数通过检查用户代理字符串来判断当前设备是否为移动设备
 * 如果用户代理字符串中包含特定的移动设备关键词，则返回 true，否则返回 false
 *
 * @returns {boolean} 如果是移动设备，返回 true，否则返回 false
 */
export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}
