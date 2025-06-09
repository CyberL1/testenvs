<script lang="ts">
import { page } from "$app/state";
import type { ContainerStats } from "$lib/types/Contaier";
import { onMount } from "svelte";

let loading = true;
let error: string | null = null;
let stats: ContainerStats = null;
let containerStatus: string = "";

onMount(async () => {
  const sse = new EventSource(`/api/containers/${page.params.id}/stats`);

  sse.onmessage = ({ data }) => {
    const parsed: ContainerStats = JSON.parse(data);
    stats = parsed;
    containerStatus =
      Object.keys(parsed.pids_stats).length > 0 ? "running" : "exited";

    loading = false;
  };
});
</script>

{#if loading}
  <p>Loading container...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if stats}
  <h1>Container: {stats.name}</h1>
  <div class="actions">
    <h2>Power Actions</h2>
    <button on:click={async () => {
      loading = true;
      error = null;

      try {
        const res = await fetch(`/api/containers/${stats.id}/start`, { method: "PUT" });
        if (!res.ok) throw new Error("Failed to start container");
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    }}
    disabled={containerStatus === "running"}>Start</button>
    <button on:click={async () => {
      loading = true;
      error = null;
      try {
        const res = await fetch(`/api/containers/${stats.id}/stop`, { method: "PUT" });
        if (!res.ok) throw new Error("Failed to stop container");
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    }}
    disabled={containerStatus === "exited"}>Stop</button>
    <button on:click={async () => {
      loading = true;
      error = null;
      try {
        const res = await fetch(`/api/containers/${stats.id}/restart`, { method: "PUT" });
        if (!res.ok) throw new Error("Failed to restart container");
      } catch (e) {
        error = e.message;
      } finally {
        loading = false;
      }
    }}>Restart</button>

    <button on:click={async () => {
if (confirm("Delete container?")) {
      try {
        const res = await fetch(`/api/containers/${stats.id}?force=true`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete container");

        window.location.href = "/";
      } catch (e) {
        error = e.message;
      }
    }
    }}>Delete</button>
  </div>
{:else}
  <p>Container not found.</p>
{/if}
