import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Textarea, Input, Button } from "@/components/ui";
import { ProfileUploader, Loader } from "@/components/shared";

import { ProfileValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queries";

const UpdateProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  // Queries
  const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isLoading: isLoadingUpdate } =
    useUpdateUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  // Handler
  const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: value.name,
      bio: value.bio,
      file: value.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });
    return navigate(`/profile/${id}`);
  };

  return (
    <div className="profile-container">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex-between w-full mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-500/20 transition-all duration-300"
              onClick={() => navigate(-1)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Button>
            <div>
              <h1 className="h3-bold text-light-1">Edit Profile</h1>
              <p className="text-light-3 text-sm">Update your profile information</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-gradient-to-br from-dark-3/50 to-dark-4/30 border border-dark-4/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-6">

              {/* Profile Picture Section */}
              <div className="flex flex-col items-center gap-4 py-6">
                <h3 className="text-lg font-semibold text-light-1">Profile Picture</h3>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="flex">
                      <FormControl>
                        <ProfileUploader
                          fieldChange={field.onChange}
                          mediaUrl={currentUser.imageUrl}
                        />
                      </FormControl>
                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-dark-4/50 to-transparent my-6"></div>

              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-light-1 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light-2 font-medium">Display Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="shad-input bg-dark-4/30 border-dark-4/50 focus:border-primary-500 transition-colors"
                            placeholder="Enter your display name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-light-2 font-medium">Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="shad-input bg-dark-4/30 border-dark-4/50 opacity-60 cursor-not-allowed"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <p className="text-xs text-light-3 mt-1">Username cannot be changed</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-light-2 font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="shad-input bg-dark-4/30 border-dark-4/50 opacity-60 cursor-not-allowed"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <p className="text-xs text-light-3 mt-1">Email cannot be changed here. Contact support if needed.</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-light-2 font-medium">Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          className="shad-textarea bg-dark-4/30 border-dark-4/50 focus:border-primary-500 transition-colors custom-scrollbar min-h-[120px]"
                          placeholder="Tell us about yourself..."
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-light-3 mt-1">Write a brief description about yourself</p>
                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 items-center justify-end pt-6 border-t border-dark-4/50">
                <Button
                  type="button"
                  variant="ghost"
                  className="px-6 py-2 border border-dark-4/50 hover:border-primary-500/50 transition-all duration-300"
                  onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg"
                  disabled={isLoadingUpdate}>
                  {isLoadingUpdate && <Loader />}
                  {isLoadingUpdate ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
