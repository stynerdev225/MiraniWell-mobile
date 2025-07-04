import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useUpdateUser } from "@/lib/react-query/queries";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared";
import { toast } from "@/components/ui/use-toast";
import { handleStripeSuccess } from "@/lib/stripe";

const MockCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUserContext();
  const { mutate: updateUser } = useUpdateUser();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const userId = queryParams.get("user_id");
  const amount = queryParams.get("amount");
  
  // Make sure the user ID matches the authenticated user
  useEffect(() => {
    if (userId !== user.id) {
      toast({
        title: "Error",
        description: "Invalid checkout session.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [userId, user.id, navigate]);

  const completePayment = async () => {
    if (!sessionId || !userId) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      const result = await handleStripeSuccess(sessionId, userId);
      
      if (result.success) {
        // Update user in database
        updateUser(
          {
            userId: user.id,
            name: user.name,
            bio: user.bio,
            imageId: "",
            imageUrl: user.imageUrl,
            file: [],
            hasPaid: true,
            paymentDate: new Date().toISOString()
          },
          {
            onSuccess: () => {
              // Update user in context
              setUser({
                ...user,
                hasPaid: true,
                paymentDate: new Date().toISOString()
              });
              
              toast({
                title: "Payment successful!",
                description: "You now have lifetime access to the Mind Body Spirit course.",
              });
              
              // Redirect to the course page
              navigate("/mind-body-spirit");
            },
            onError: () => {
              toast({
                title: "Error updating account",
                description: "Payment was processed but there was an error updating your account. Please contact support.",
                variant: "destructive",
              });
            }
          }
        );
      }
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelPayment = () => {
    toast({
      title: "Payment cancelled",
      description: "Your payment has been cancelled. You can try again anytime.",
    });
    navigate("/mind-body-spirit");
  };

  if (isProcessing) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg bg-dark-3">
        <div className="text-center mb-8">
          <h1 className="h3-bold md:h2-bold mb-2">Complete Your Purchase</h1>
          <p className="text-light-3 mb-6">Mind Body Spirit Course</p>
          
          <div className="border-t border-b border-dark-4 py-4 my-4">
            <div className="flex justify-between mb-4">
              <span>Lifetime Access</span>
              <span>${Number(amount)/100}</span>
            </div>
            
            <div className="flex justify-between font-bold pt-4 border-t border-dark-4">
              <span>Total</span>
              <span>${Number(amount)/100}</span>
            </div>
          </div>
          
          <div className="bg-dark-4 p-4 rounded-lg mb-6 text-light-2">
            <p className="text-sm mb-2">This is a demo checkout page.</p>
            <p className="text-sm">In a real application, you would be redirected to Stripe's secure payment page.</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button 
              type="button" 
              size="lg"
              className="bg-red-500 hover:bg-red-600"
              onClick={cancelPayment}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              size="lg"
              className="bg-primary-500 hover:bg-primary-600" 
              onClick={completePayment}
            >
              Pay ${Number(amount)/100}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockCheckout;
