import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {toast} from 'sonner';
import {customFetch} from '@/utils';

const formSchema = z
    .object({
        oldPassword: z
            .string()
            .min(6, {message: 'Password must be at least 6 characters.'}),
        newPassword: z
            .string()
            .min(6, {message: 'Password must be at least 6 characters.'}),
        confirmPassword: z
            .string()
            .min(6, {message: 'Password must be at least 6 characters.'}),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

function ChangedPasswordForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {confirmPassword, ...reqData} = values;

        try {
            await customFetch.patch('/me/password', reqData);
            toast('Password successfully changed!');
            form.reset();
        } catch (err) {
            console.error('Error changing password:', err);
            toast('Something went wrong!');
            return null;
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormMessage className="text-red-500" />
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Old password"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormMessage className="text-red-500" />
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="New password"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormMessage className="text-red-500" />
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm password"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    CHANGE PASSWORD
                </Button>
            </form>
        </Form>
    );
}

export default ChangedPasswordForm;
