'use client';

import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { BACKEND_URL } from '@/lib/constants';
import { Skeleton } from "@/components/ui/skeleton";
import { getSession, Session } from '@/lib/session';
import { getUser, updateProfileAction } from '@/lib/action';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from '@/app/components/SubmitBotton';

export default function ProfilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [state, formAction] = useActionState(updateProfileAction, null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    async function loadData() {
      try {
        const currentSession = await getSession();
        setSession(currentSession);

        if (currentSession?.user?.id) {
          const user = await getUser(currentSession.user.id);
          setUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image || ''
          });
          if (user.image) {
            setPreviewImage(`${BACKEND_URL}/${user.image}`);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  
    const file = e.dataTransfer.files[0];
    
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.files = dataTransfer.files;
    }
  };

 
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-[5%]">
        <CardContent className="p-6">
          <div className="space-y-6">
            <Skeleton className="h-8 w-24" />
            <div className="flex flex-col items-center">
              <Skeleton className="w-32 h-32 rounded-full" />
              <Skeleton className="h-4 w-48 mt-2" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-3 w-64" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full max-w-2xl mx-auto mt-[5%]">
      <CardContent className="p-6">
        <form action={async (formData) => {
          formData.append('firstName', userData.firstName);
          formData.append('lastName', userData.lastName);
          formData.append('email', userData.email);
          
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          if (fileInput.files && fileInput.files[0]) {
            formData.append('image', fileInput.files[0]);
          }
          
          return formAction(formData);
        }} >
          <input type="hidden" name="userId" value={session?.user?.id} />
          <a href='/user' style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-left-icon lucide-chevrons-left">
    <path d="m11 17-5-5 5-5"/>
    <path d="m18 17-5-5 5-5"/>
  </svg>
  <span>Return</span>
</a>          <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
          
{state?.message && (
  <Alert variant={state.success ? "default" : "destructive"} className="mb-6">
    <AlertTitle>{state.success ? "Success" : "Error"}</AlertTitle>
    <AlertDescription>
      {state.message}
    </AlertDescription>
  </Alert>
)}
          {isLoading ? (
            <Skeleton className="w-32 h-32 rounded-full mx-auto mb-6" />
          ) : (
            <div className="flex flex-col items-center mb-6">
          
              <div
                onClick={() => document.getElementById('fileInput')?.click()}
                className={`relative w-32 h-32 rounded-full cursor-pointer overflow-hidden ${
                  isDragging ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <>
                    <img 
                      src={previewImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center transition-all duration-300">
                      <span className="text-white opacity-0 hover:opacity-100 text-center text-sm px-2 transition-opacity duration-300">
                        Drag & Drop or Click to Change
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400">
                    <span className="text-gray-500 text-sm text-center px-2">
                      {isDragging ? 'Drop your image here' : 'Click or drag to upload'}
                    </span>
                  </div>
                )}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Click to browse or drag & drop your image
              </p>
            </div>
          )}

<div className="grid md:grid-cols-2 gap-8 mb-4">
  <div>
    <Label htmlFor="firstName">First Name</Label>
    <Input
      id="firstName"
      name="firstName"
      defaultValue={userData.firstName}
      required
      className={state?.error?.firstName ? "border-destructive" : ""}
    />
    {state?.error?.firstName && (
      <p className="text-sm text-red-300  mt-1">
        {state.error.firstName[0]}
      </p>
    )}
  </div>
  <div>
    <Label htmlFor="lastName">Last Name</Label>
    <Input
      id="lastName"
      name="lastName"
      defaultValue={userData.lastName}
      required
      className={state?.error?.lastName ? "border-destructive" : ""}
    />
    {state?.error?.lastName && (
      <p className="text-sm text-destructive mt-1">
        {state.error.lastName[0]}
      </p>
    )}
  </div>
</div>

<div className="mb-6">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    name="email"
    type="email"
    defaultValue={userData.email}
    required
    className={state?.error?.email ? "border-destructive" : ""}
  />
  {state?.error?.email && (
    <p className="text-sm text-destructive mt-1">
      {state.error.email[0]}
    </p>
  )}
</div>

<div className="mb-6">
  <Label htmlFor="password">New Password (leave blank to keep current)</Label>
  <Input
    id="password"
    name="password"
    type="password"
    placeholder="••••••••"
    className={state?.error?.password ? "border-destructive" : ""}
  />
  {state?.error?.password && (
    <p className="text-sm text-destructive mt-1">
      {state.error.password[0]}
    </p>
  )}
  <p className="text-sm text-muted-foreground mt-1">
    Password must be at least 8 characters
  </p>
</div>

          <div className="flex justify-between mt-8">
            <a href='/user'><Button variant="outline" type="button">
              Cancel
            </Button></a>
            <SubmitButton text="Update Profile" variant="default" />
            </div>
        </form>
      </CardContent>
    </Card>
  );
}