"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { memberSchema } from "@/schemas/members";
import { Toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

export default function ComingSoon() {
    // Set the date we're counting down to
    const countDownDate = new Date("July 10, 2024 00:00:00").getTime();

    // State to hold the countdown values
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Update the countdown every 1 second
        const interval = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // If the countdown is finished, clear the interval
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            } else {
                // Update the state with the new time left
                setTimeLeft({
                    days,
                    hours,
                    minutes,
                    seconds,
                });
            }
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [countDownDate]);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof memberSchema>>({
        resolver: zodResolver(memberSchema)
    });

    const onSubmit = async (input: z.infer<typeof memberSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/members", input);
            Toast(response.data);
        } catch (error: any) {
            Toast({ success: false, message: error?.message || "Something went wrong." });
        } finally {
            setLoading(false);
            form.reset({ email: "" });  // Reset form value
        }
    };

    return (
        <div className="h-screen flex-center px-4 bg-gradient-to-tr from-sky-100 via-pink-200 to-blue-300">
            <div className="md:w-[40%] border mx-auto shadow-lg rounded-lg overflow-hidden bg-background">
                <div className="p-4 md:p-7">
                    <h2 className="md:max-w-screen-lg text-4xl md:text-5xl font-bold">Launching Soon</h2>
                    <p className="mt-2 text-md text-muted-foreground">
                        We are working hard to bring you an amazing website. Subscribe to get the latest news!
                    </p>
                </div>

                <div className="p-4 md:p-7">
                    <div className="flex-center flex-wrap gap-2">
                        <div className="bg-secondary rounded-lg p-2">
                            <div className="font-medium text-2xl text-main">
                                {timeLeft.days}d
                            </div>
                        </div>
                        <span>:</span>
                        <div className="bg-secondary rounded-lg p-2">
                            <div className="font-medium text-2xl text-main">
                                {timeLeft.hours}h
                            </div>
                        </div>
                        <span>:</span>
                        <div className="bg-secondary rounded-lg p-2">
                            <div className="font-medium text-2xl text-main">
                                {timeLeft.minutes}m
                            </div>
                        </div>
                        <span>:</span>
                        <div className="bg-secondary rounded-lg p-2">
                            <div className="font-medium text-2xl text-main">
                                {timeLeft.seconds}s
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-7 flex-between gap-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-between gap-2 w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Enter email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={loading} variant={"main"} type="submit">
                                {loading ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}