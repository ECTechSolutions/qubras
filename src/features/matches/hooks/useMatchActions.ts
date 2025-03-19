
import { toast } from "@/components/ui/use-toast";

export const useMatchActions = () => {
  const handleAccept = (id: string) => {
    toast({
      title: "Connection request sent",
      description: "You've sent a connection request to this company",
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Match rejected",
      description: "This company will no longer appear in your matches",
    });
  };

  const handleMessage = (id: string) => {
    toast({
      title: "Message center opened",
      description: "Start a conversation with this company",
    });
  };

  return {
    handleAccept,
    handleReject,
    handleMessage
  };
};
