/**
 * V-SCOPS Optimization Engine
 * Simulated AI logic for waste risk scoring and promotion orchestration.
 */

import { INVENTORY, VENDORS } from './sampleData';

/**
 * Recalculates risk score based on inventory dynamics
 */
export const computeWasteRisk = (sku) => {
  const stockDaysRemaining = sku.qty / (sku.sellRate || 1);
  const pressure = (stockDaysRemaining / sku.daysToExpiry) * 100;
  
  // High pressure means stock won't sell before expiry
  // 0-40: Low, 40-70: Medium, 70-100+: Critical
  return Math.min(Math.round(pressure), 100);
};

/**
 * Orchestrates the best strategy based on vendor constraints
 */
export const selectStrategy = (sku) => {
  const vendor = VENDORS.find(v => v.id === sku.vendorId);
  const risk = sku.riskScore;

  if (risk < 40) return { type: 'NONE', label: 'Monitor' };

  if (vendor.contractType === 'Own') {
    return {
      type: 'MARKDOWN',
      label: 'Smart Markdown',
      discount: risk > 80 ? 50 : 30,
      description: 'Internal decision. Direct price reduction.'
    };
  }

  if (vendor.contractType === 'Consignment') {
    if (vendor.markdownAllowed) {
      return {
        type: 'MARKDOWN',
        label: 'Smart Markdown (Allowed)',
        discount: 25,
        description: 'Vendor allowed markdown. Standard reduction.'
      };
    } else {
      return {
        type: 'BUNDLE',
        label: 'Smart Bundle',
        companionSku: 'P007', // High margin drink
        description: 'Markdown not allowed. Bundling with high-margin items to absorb cost.'
      };
    }
  }

  return { type: 'VENDOR_APPROVAL', label: 'Simulate & Request', description: 'Request vendor co-funding.' };
};

/**
 * Simulates financial impact for vendor dashboard
 */
export const simulateVendorImpact = (sku, strategy) => {
  const wasteCost = sku.qty * sku.price;
  const currentMargin = sku.qty * sku.margin;
  
  let newMargin = currentMargin;
  let revenueUplift = 0;

  if (strategy.type === 'MARKDOWN') {
    const discountAmount = (sku.price * strategy.discount) / 100;
    // Assume markdown clears 90% of stock vs 40% if nothing done
    revenueUplift = (sku.qty * 0.9 * (sku.price - discountAmount)) - (sku.qty * 0.4 * sku.price);
    newMargin = (sku.qty * 0.9 * (sku.margin - discountAmount));
  } else if (strategy.type === 'BUNDLE') {
    revenueUplift = sku.qty * 0.2 * sku.price; // Conservative uplift
    newMargin = currentMargin * 1.1; // Bundle margin optimization
  }

  return {
    wasteRiskValue: wasteCost,
    expectedUplift: Math.max(0, revenueUplift),
    marginDelta: newMargin - currentMargin
  };
};
