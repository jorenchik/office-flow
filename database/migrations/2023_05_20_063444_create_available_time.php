<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('available_times', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->dateTime('starting_at');
            $table->dateTime('ending_at');
            $table->foreign('user_id')->references('id')->on('users');
            $table->primary(['user_id', 'starting_at', 'ending_at']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('available_time');
    }
};
