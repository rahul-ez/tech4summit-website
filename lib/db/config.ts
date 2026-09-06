import { createClient } from '@/lib/supabase/server'
import type { HackathonConfig, Json } from '@/types/database'

/**
 * Retrieves all configuration key-values from the hackathon_config table.
 */
export async function getAllHackathonConfig(): Promise<HackathonConfig[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('hackathon_config')
      .select('*')

    if (error) {
      console.warn('Could not fetch hackathon_config from DB:', error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.warn('Database error in getAllHackathonConfig:', error)
    return []
  }
}

/**
 * Retrieves a dictionary map of key -> value for all config items.
 */
export async function getHackathonConfigMap(): Promise<Record<string, Json | null>> {
  const configs = await getAllHackathonConfig()
  const configMap: Record<string, Json | null> = {}

  for (const item of configs) {
    configMap[item.key] = item.value
  }

  return configMap
}

/**
 * Retrieves a single configuration value by key, falling back to static config defaults if absent.
 */
export async function getConfigValue<T = Json | null>(key: string, defaultValue?: T): Promise<T | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('hackathon_config')
      .select('value')
      .eq('key', key)
      .maybeSingle()

    if (error || !data || data.value === undefined) {
      if (defaultValue !== undefined) return defaultValue
      return null
    }

    return (data.value as unknown) as T
  } catch (error) {
    console.warn(`Database error fetching config key "${key}":`, error)
    if (defaultValue !== undefined) return defaultValue
    return null
  }
}
