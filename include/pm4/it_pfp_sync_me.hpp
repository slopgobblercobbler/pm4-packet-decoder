#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItPfpSyncMeDef {
    static constexpr std::uint8_t opcode = 0x42;
    static constexpr std::string_view name = "IT_PFP_SYNC_ME";
    static constexpr std::string_view desc = "Synchronize Prefetch Parser (PFP) execution with Micro Engine (ME)";
};
}
